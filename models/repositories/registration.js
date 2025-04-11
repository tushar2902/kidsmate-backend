const { Op } = require('sequelize');
const { Registration } = require('..'); 

exports.checkDuplicate = async (data, id) => {
  try {
    return await Registration.findOne({
      where: {
        fullName: { [Op.iLike]: data.fullName.trim() },
        courseName: { [Op.iLike]: data.courseName.trim() },
        phone: data.phone.trim(),
        ...(id && { id: { [Op.not]: id } }),
      },
    });
  } catch (error) {
    console.error('Error in checkDuplicate:', error);
    throw new Error('Error checking duplicate registration');
  }
};

exports.createRegistration = async (registrationData) => {
  const isDuplicate = await this.checkDuplicate(registrationData);

  if (isDuplicate) {
    return {
      success: false,
      message: 'Registration with same details already exists.',
    };
  }

  const newRegistration = await Registration.create(registrationData);

  return {
    success: true,
    data: newRegistration,
  };
};
