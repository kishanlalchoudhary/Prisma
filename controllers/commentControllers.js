const prisma = require("../db/prisma");

const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment: comment,
    },
  });

  return res.json({
    status: 200,
    data: newComment,
    message: "Comment created successfully",
  });
};

const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });

  return res.json({
    status: 200,
    data: comments,
    message: "Comments fetched succesfully",
  });
};

const fetchComment = async (req, res) => {
  const commentId = req.params.id;

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  return res.json({
    status: 200,
    data: comment,
    message: "Required comment fetched succesfully",
  });
};

const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;

  const findComment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (!findComment) {
    return res.json({
      status: 400,
      message: "comment not found",
    });
  }

  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      comment: comment,
    },
  });

  return res.json({ status: 200, message: "Comment updated successfully" });
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  const findComment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (!findComment) {
    return res.json({
      status: 400,
      message: "Comment not found",
    });
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return res.json({ status: 200, message: "comment deleted successfully" });
};

module.exports = {
  createComment,
  fetchComments,
  fetchComment,
  updateComment,
  deleteComment,
};
