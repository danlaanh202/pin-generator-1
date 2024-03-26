// export const save = async (req, res) => {
//   try {
//     const {imageList, templateNumber} = req.body;
//     const savedData = await db.template.save({
//       imageList,
//       templateNumber
//     });
//     return res.status(200).json(savedData);
//   } catch (e) {
//     return res.status(500).json(e.message);
//   }
// };

export const getOne = async (req, res) => {
  try {
    const template = await db.template.get(req.params.templateId);
    return res.status(200).json(template);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const getAll = async (req, res) => {
  try {
    const templates = await db.template.get();
    return res.status(200).json(templates);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
