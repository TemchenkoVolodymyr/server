const dialogsModules = require('../../../../modules/SocialCosmos/Messages/DialogsModules/DialogsModules')

const createDialog = async (req, res) => {
  const {chatId, senderId, text} = req.body

  const dialogs = new dialogsModules({
    chatId, senderId, text
  })

  try {
    const response = await dialogs.save()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const getDialog = async (req, res) => {
  const {chatId} = req.params
  try {
    const dialogs = await dialogsModules.find({chatId})
    res.status(200).json(dialogs)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = {createDialog , getDialogs: getDialog}