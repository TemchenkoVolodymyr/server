const Messages = require('../../../modules/SocialCosmos/Messages/messagesModules')
const factory = require("../../../controlles/HandlerFactory");

exports.getAllMessages = factory.getAllHandler(Messages);
exports.createMessage = factory.createHandler(Messages);
exports.deleteMessage = factory.deleteHandler(Messages);

exports.createChat = async (req, res) => {
  const {firstId, secondId} = req.body

  try {
    const chat = await Messages.findOne({
      members: {$all: [firstId, secondId]}
    })
    if (chat) return res.status(200).json(chat);

    const newChat = new Messages({
      members: [firstId, secondId]
    })

    const response = await newChat.save()
    res.status(200).json(response);

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
};

exports.findUserChats = async (req, res) => {
  const userId = req.params.userId

  try {
    const chats = await Messages.find({
      members: {$in: [userId]}
    })

    res.status(200).json(chats);

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

exports.findChat = async (req, res) => {
  const {firstId,secondId} = req.params;

console.log(firstId)
console.log(secondId)
  try {
    const chat = await Messages.findOne({
      members: {$all: [firstId, secondId]}
    })

    res.status(200).json(chat);

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

exports.findCurrentUserChats = async (req ,res) => {
  const {firstId,secondId} = req.params;

  try{
    const chats = await Messages.find({
      members:{$all:[firstId,secondId]}
    })
    res.status(200).json(chats)
  }catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

