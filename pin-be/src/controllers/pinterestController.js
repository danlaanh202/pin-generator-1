import {createNewBoard, createNewPin, getMyBoards} from '../services/pinterestServices';
import SeleniumServices from '../services/SeleniumServices';

const seleniumServices = new SeleniumServices();

// https://developers.pinterest.com/docs/api/v5/#operation/pins/create
export const createPin = async (req, res) => {
  try {
    const {data} = req.body;
    const createdPin = await createNewPin({
      data
    });
    return res.status(200).json({pin: createdPin.data});
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const createBoard = async (req, res) => {
  try {
    const {data} = req.body;
    const createdBoard = await createNewBoard({
      data
    });
    return res.status(200).json({board: createdBoard.data});
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const getBoards = async (_, res) => {
  try {
    const pins = await getMyBoards();
    return res.status(200).json({pins});
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const generateDataFromUrl = async (req, res) => {
  try {
    const {url} = req.query;
    const {images, title} = await seleniumServices.initialize(url);
    return res.status(200).json({data: {images, title}});
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
};

export const generateDescription = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
};
