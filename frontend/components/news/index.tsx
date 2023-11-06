"use client";

import { useTranslations } from "next-intl";
import NewsCard from "../newsCard";

const newsImage = (index: number) => {
  switch (index) {
    case 0:
      return "/news/orchestra.png";
    case 1:
      return "/news/workshop-cuisine.jpg";
    case 2:
      return "/news/krk.jpg";
  }
};

export default function News() {
  const t = useTranslations();

  return (
    <div className="md:px-4">
      <div className="flex justify-between mb-4">
        <p className="font-bold text-xl">{t("news.recent")}</p>
        <p className="text-sm">{t("news.viewMore")}</p>
      </div>
      <div className="flex gap-2 justify-around md:flex-row flex-col">
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <NewsCard
              description={t(`news.item${index + 1}.description`)}
              title={t(`news.item${index + 1}.title`)}
              image={newsImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
