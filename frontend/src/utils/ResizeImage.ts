type ResizeOptions = {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number; // 0..1 for JPEG/WebP
    targetMaxBytes?: number; // soft cap; will try to reduce quality/size
};

const defaultOpts: Required<ResizeOptions> = {
    maxWidth: 1920,
    maxHeight: 1920,
    quality: 0.8,
    targetMaxBytes: 9.5 * 1024 * 1024, // 9.5 MB safety margin
};

function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
}

export async function resizeImageFile(file: File, options: ResizeOptions = {}): Promise<File> {
    const opts = { ...defaultOpts, ...options };
    try {
        const dataUrl = await readFileAsDataURL(file);
        const img = await loadImage(dataUrl);

        // Compute initial scale to fit within bounds
        const scale = Math.min(1, opts.maxWidth / img.width, opts.maxHeight / img.height);
        let targetW = Math.max(1, Math.round(img.width * scale));
        let targetH = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return file;

        // Iteratively try reducing quality (and if needed, dimensions) to meet target size
        let quality = opts.quality;
        for (let attempt = 0; attempt < 6; attempt++) {
            canvas.width = targetW;
            canvas.height = targetH;
            ctx.clearRect(0, 0, targetW, targetH);
            ctx.drawImage(img, 0, 0, targetW, targetH);

            const blob: Blob | null = await new Promise((resolve) =>
                canvas.toBlob(resolve, 'image/jpeg', quality)
            );
            if (!blob) break;

            if (blob.size <= opts.targetMaxBytes) {
                return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
            }

            // First, reduce quality down to 0.5 in 0.1 steps
            if (quality > 0.5) {
                quality = Math.max(0.5, quality - 0.1);
                continue;
            }

            // Then reduce dimensions by 15% and reset quality a bit higher
            targetW = Math.max(1, Math.round(targetW * 0.85));
            targetH = Math.max(1, Math.round(targetH * 0.85));
            quality = Math.min(0.8, quality + 0.1);
        }

        // If still too large after attempts, return the last produced file anyway;
        // server may reject, but we tried.
        const fallbackBlob: Blob | null = await new Promise((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', Math.max(0.5, opts.quality - 0.3))
        );
        if (fallbackBlob) {
            return new File([fallbackBlob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
        }
        return file;
    } catch {
        // On any error, just return original file
        return file;
    }
}
