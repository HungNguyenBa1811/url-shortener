import {
    createURLShortenerService,
    getURLShortenerByCodeService,
    updateURLShortenerService,
    deleteURLShortenerService,
} from '../services/url-shortener.service.js';

export const createURLShortener = async (req, res) => {
    const { url } = req.body;
    // Adding temp value to db to get id
    const data = await createURLShortenerService(url);
    res.status(201).json({
        message: 'URL Shortened!',
        data,
    });
};

export const getURLShortenerByCode = async (req, res) => {
    const { code } = req.params;
    const shortCodeData = req.shortCodeData;

    // Get code & update access count
    const data = await getURLShortenerByCodeService(code, shortCodeData);
    res.status(200).json({
        message: 'Get URL successfully',
        data,
    });
};

export const getURLShortenerStats = async (req, res) => {
    const { code } = req.params;
    const shortCodeData = req.shortCodeData;

    // Get stats
    res.status(200).json({
        message: 'Get URL Stats successfully',
        data: shortCodeData,
    });
};

export const updateURLShortener = async (req, res) => {
    const { code } = req.params;
    const { url } = req.body;
    const shortCodeData = req.shortCodeData;

    // Update URL
    const data = await updateURLShortenerService(code, url, shortCodeData);

    res.status(200).json({
        message: 'URL Updated Successfully',
        data,
    });
};

export const deleteURLShortener = async (req, res) => {
    const { code } = req.params;
    const shortCodeData = req.shortCodeData;

    // Delete URL
    const data = await deleteURLShortenerService(code, shortCodeData);

    res.status(200).json({
        message: 'URL Deleted Successfully'
    });
};
