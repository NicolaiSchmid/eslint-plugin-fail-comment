const DEFAULT_FAIL_TOKEN = "FAIL";

function parseComment(comment) {}

module.exports = {
  rules: {
    "fail-comment": {
      meta: {
        fixable: null,
        type: "problem",
      },
      create: function (context) {
        const sourceCode = context.getSourceCode();
        const { options } = context;

        const FAIL_TOKEN = options[0] || DEFAULT_FAIL_TOKEN;

        return {
          Program() {
            const comments = sourceCode.getAllComments();
            comments.forEach((comment) => {
              const content = comment.value.trim();

              if (content.includes(FAIL_TOKEN)) {
                const message = content.split(" ").slice(1).join(" ");

                context.report({
                  loc: comment.loc,
                  message: `Purposeful ${FAIL_TOKEN} comment${
                    message ? `: ${message}` : ""
                  }`,
                });
              }
            });
          },
        };
      },
    },
  },
};
