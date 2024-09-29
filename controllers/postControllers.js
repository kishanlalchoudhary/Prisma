const prisma = require("../db/prisma");

const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title: title,
      description: description,
    },
  });

  return res.json({
    status: 200,
    data: newPost,
    message: "Post created successfully",
  });
};

const fetchPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      id: "desc",
    },

    where: {
      // comment_count: {
      //   gt: 1,
      // },

      // title: {
      //   startsWith: "T"
      // }

      // title: {
      //   endsWith: "a"
      // }

      // title: {
      //   equals: "Prisma",
      // },

      // OR: [
      //   {
      //     title: {
      //       startsWith: "T",
      //     },
      //   },
      //   {
      //     title: {
      //       endsWith: "a",
      //     },
      //   },
      // ],

      NOT: {
        title: {
          startsWith: "T",
        },
      },
    },
  });

  return res.json({
    status: 200,
    data: posts,
    message: "Posts fetched succesfully",
  });
};

const fetchPost = async (req, res) => {
  const postId = req.params.id;

  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });

  return res.json({
    status: 200,
    data: post,
    message: "Required post fetched succesfully",
  });
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  const findpost = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });

  if (!findpost) {
    return res.json({
      status: 400,
      message: "Post not found",
    });
  }

  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title: title,
      description: description,
    },
  });

  return res.json({ status: 200, message: "Post updated successfully" });
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  const findpost = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });

  if (!findpost) {
    return res.json({
      status: 400,
      message: "Post not found",
    });
  }

  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });

  return res.json({ status: 200, message: "Post deleted successfully" });
};

const searchPost = async (req, res) => {
  const query = req.query.q;

  const posts = await prisma.post.findMany({
    where: {
      description: {
        // contains: query,
        search: query,
      },
    },
  });

  res.json({ status: 200, data: posts, message: "Search post results" });
};

module.exports = {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  deletePost,
  searchPost,
};
