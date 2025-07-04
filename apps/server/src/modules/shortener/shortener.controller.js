import turl from 'turl';
import ShortenerModel from './shortener.model.js';

const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).send({ error: 'Original URL is required' });
  }

  try {
    const shortUrl = await turl.shorten(originalUrl);

    const shortener = new ShortenerModel({
      originalUrl,
      shortUrl,
    });

    await shortener.save();

    return res.status(201).json(shortUrl);
  } catch (error) {
    return res.status(500).send({
      error: 'Internal server error, while creating short URL',
      message: error.message,
    });
  }
};

const retrieveOriginalUrl = async (req, res) => {
  const { shortUrl } = req.body;

  if (!shortUrl) {
    return res.status(400).send({ error: 'Short URL is required' });
  }

  try {
    const originalUrl = await ShortenerModel.findOne({ shortUrl });

    return res.status(200).json({
      message: 'Original URL retrieved successfully',
      data: {
        originalUrl: originalUrl.originalUrl,
        shortUrl: originalUrl.shortUrl,
      },
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Internal server error, while retrieving original URL',
      message: error.message,
    });
  }
};

const updateShortUrl = async (req, res) => {
  const { shortUrl } = req.body;

  if (!shortUrl) {
    return res.status(400).send({ error: 'Short URL is required' });
  }

  try {
    const newShortUrl = await turl.shorten(shortUrl);
    const originalUrl = await ShortenerModel.updateOne(
      { shortUrl },
      { shortUrl: newShortUrl }
    );

    return res.status(200).json({
      message: 'Short URL updated successfully',
      data: {
        originalUrl: originalUrl.originalUrl,
        shortUrl: originalUrl.shortUrl,
      },
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Internal server error, while updating short URL',
      message: error.message,
    });
  }
};

const deleteShortUrl = async (req, res) => {
  const { shortUrl } = req.body;

  if (!shortUrl) {
    return res.status(400).send({ error: 'Short URL is required' });
  }

  try {
    await ShortenerModel.deleteOne({ shortUrl });

    return res.status(200).json({
      message: 'Short URL deleted successfully',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Internal server error, while deleting short URL',
      message: error.message,
    });
  }
};

export const redirect = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlRecord = await ShortenerModel.findOne({ shortUrl });

    if (!urlRecord) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    urlRecord.accessCount += 1;
    await urlRecord.save();

    return res.redirect(urlRecord.originalUrl);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error while redirecting',
      message: error.message,
    });
  }
};

export const getStats = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlRecord = await ShortenerModel.findOne({ shortUrl });

    if (!urlRecord) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.status(200).json({
      originalUrl: urlRecord.originalUrl,
      shortUrl: urlRecord.shortUrl,
      accessCount: urlRecord.accessCount,
      createdAt: urlRecord.createdAt,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error while getting stats',
      message: error.message,
    });
  }
};

export const create = createShortUrl;
export const retrieve = retrieveOriginalUrl;
export const update = updateShortUrl;
export const deleteUrl = deleteShortUrl;
export const redirectUrl = redirect;
export const getStatsUrl = getStats;
