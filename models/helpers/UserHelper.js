exports.modifyOutputData = (existingUser) => ({
  id: existingUser.id,
  userName: existingUser.userName,
  fullName: existingUser.fullName,
  token: existingUser.genToken(),
});
