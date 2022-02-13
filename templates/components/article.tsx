import { blockComponent } from "#components/meta";
import {
  Article,
  ArticleBody,
  ArticleFooter,
  ArticleHeader,
} from "#components/articles";
import { Heading } from "#components/headings";
import styles from "./article.module.scss";

import type { IArticleProps } from "#components/articles";

interface ITemplateArticleProps extends IArticleProps {}

const TemplateArticle = blockComponent<ITemplateArticleProps>(styles.block, () => {
  return (
    <Article>
      <ArticleHeader>
        <Heading></Heading>
      </ArticleHeader>
      <ArticleBody></ArticleBody>
      <ArticleFooter></ArticleFooter>
    </Article>
  );
});
