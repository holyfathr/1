import React from "react";
import faqData from './faq.json';

import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page";
import Spoiler from "components/ui/Spoiler";
import Subsection from "components/ui/Subsection";
import Divider from "components/ui/Divider";
import Link from "components/ui/Link";

import styles from "./faq.module.scss"

const FAQPage = () => {
    return (
        <Layout title="FAQ">
            <Page title="FAQ">
                {Object.entries(faqData).map(([sectionTitle, questions], index) => (
                    <Subsection key={index} title={sectionTitle}>
                        {questions.map((faq, faqIndex) => (
                            <React.Fragment key={faqIndex}>
                                <Divider className={styles.divider} orientation="vertical" />
                                <Spoiler title={faq.question} contentInnerClassName={styles.content} outerClassName={styles.title}>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </Spoiler>
                            </React.Fragment>
                        ))}
                        <Divider className={styles.divider} />
                    </Subsection>
                ))}
                <div className={styles.writeUs}>
                    Остались ещё вопросы? Напиши нам на{" "}
                    <Link href="mailto:support@almater.com" className={styles.writeUsUrl}>support@almater.com</Link>
                </div>
            </Page>
        </Layout>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "index.page", "header"])),
        },
    }
}

export default FAQPage
