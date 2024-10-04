export const sendResponse = (res: any, status: boolean, message: string, data: any = []) => {
    return res.json({
        status: status,
        message: message,
        data: Array.isArray(data) ? data : [data]
    });
};
