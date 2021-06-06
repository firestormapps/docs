import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Aprenda sobre os projetos',
    imageUrl: 'img/first_item.svg',
    description: (
      <>
        Este é o lugar certo para tirar todas as dúvidas sobre nossos projetos internos.
      </>
    ),
  },
  {
    title: 'Colabore',
    imageUrl: 'img/second_item.svg',
    description: (
      <>
        Sinta-se à vontade para alterar os documentos como bem entender!
      </>
    ),
  },
  {
    title: 'Tuts Tuts',
    imageUrl: 'img/third_item.svg',
    description: (
      <>
        Você pode escrever tutoriais e artigos na sessão <code>Blog</code>
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img
            src={useBaseUrl(`img/logo.png`)}
            height={100}
            className={styles.logo}
            alt="Logo"
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
