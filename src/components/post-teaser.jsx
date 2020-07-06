/** @jsx jsx */
import { jsx, Styled, Grid, Flex } from "theme-ui";
import { format } from "date-fns";

export const PostTeaser = ({ post, ...props }) => (
  <article {...props}>
    <Grid
      columns={["1", "1", "350px 1fr", "400px 1fr"]}
      gap={[4, 4, 10]}
      sx={{ alignItems: "flex-start" }}
    >
      {post.image && (
        <Styled.a
          href={post.link}
          sx={{ display: "block", overflow: "hidden" }}
        >
          <Styled.img
            src={post.image}
            title={post.title}
            alt={post.title}
            sx={{
              ml: [null, null, "-25%"],
            }}
          />
        </Styled.a>
      )}
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        {post.title && (
          <Styled.h2
            sx={{
              mt: 0,
              mb: 4,
              fontSize: ["2xl", "2xl", "3xl", "4xl"],
            }}
          >
            <Styled.a href={post.link}>{post.title}</Styled.a>
          </Styled.h2>
        )}
        {post.subtitle && <Styled.p sx={{ mt: 1 }}>{post.subtitle}</Styled.p>}
        <Flex
          sx={{
            flex: 1,
            alignItems: "flex-end",
            pb: "2",
          }}
        >
          {post.date && (
            <time dateTime={post.date}>
              {format(new Date(post.date), "MM/dd/yyyy")}
            </time>
          )}
          {post.timeToRead && (
            <span sx={{ ml: 2 }}> - {post.timeToRead} min read</span>
          )}
        </Flex>
      </Flex>
    </Grid>
  </article>
);

export default PostTeaser;
