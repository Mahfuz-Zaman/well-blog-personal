const getImagePath = (originalPath) => {
    if (!originalPath) {
        return "";
    }

    const baseURL = import.meta.env.VITE_SUPABASE_URL;
    const imagePath = `${baseURL}/storage/v1/object/public/${originalPath}`;

    return imagePath;
};

export default getImagePath;