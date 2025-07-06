import { getAllURLsService, getAllStatsService, forceDeleteURLService } from '../services/admin.service.js';

export const getAllURLsController = async (req, res) => {
    const { page, per_page, order } = req.query;
    const data = await getAllURLsService(page, per_page, order);
    res.status(200).json({
        message: "Get URLs successfully",
        data
    })
}

export const getAllStatsController = async (req, res) => {
    const data = await getAllStatsService();
    res.status(200).json({
        message: "Get URLs' Stats successfully",
        data
    });
}

export const forceDeleteURLController = async (req, res) => {
    const { code } = req.params;
    const shortCodeData = req.shortCodeData;
    const data = await forceDeleteURLService(code, shortCodeData);
    res.status(200).json({
        message: "Force delete URL successfully",
        data
    })
}