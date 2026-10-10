import type { CSSProperties } from "react";
import type { LanguageId } from "@/lib/languages";
import type { SnippetsByLang } from "@/hooks/use-catalog";
import { featureAnchor } from "@/lib/anchors";
import type { Outline } from "@/lib/types";
import { AddFirstSectionButton, FeatureActions, SectionActions } from "./OutlineActions";
import { SnippetCard } from "./SnippetCard";

type Props = {
  outline: Outline;
  snippets: SnippetsByLang;
  selected: readonly LanguageId[];
  canEdit: boolean;
};

/** Every section and feature, with one column per selected language (stacked on phones). */
export function Comparison({ outline, snippets, selected, canEdit }: Props) {
  // Columns on md+ screens; one card per row below that.
  const columns = { "--cols": selected.length } as CSSProperties;

  return (
    <div className="flex flex-col gap-14">
      {outline.map((section, si) => (
        <section key={section._id} id={section.slug} aria-labelledby={`${section.slug}-title`} className="flex flex-col gap-8">
          <div className="flex items-center gap-2 border-b pb-2">
            <h2 id={`${section.slug}-title`} className="text-2xl font-semibold tracking-tight">
              {section.title}
            </h2>
            {canEdit && <SectionActions section={section} isFirst={si === 0} isLast={si === outline.length - 1} />}
          </div>

          {section.features.length === 0 && <p className="text-sm text-muted-foreground">No features yet.</p>}

          {section.features.map((feature, fi) => (
            <article key={feature._id} id={featureAnchor(section.slug, feature.slug)} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">
                  <a href={`#${featureAnchor(section.slug, feature.slug)}`} className="hover:underline">
                    {feature.title}
                  </a>
                </h3>
                {canEdit && <FeatureActions feature={feature} isFirst={fi === 0} isLast={fi === section.features.length - 1} />}
              </div>
              <div style={columns} className="grid gap-3 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]">
                {selected.map((lang) => {
                  const forLang = snippets[lang];
                  return (
                    <SnippetCard
                      key={lang}
                      featureId={feature._id}
                      featureTitle={feature.title}
                      lang={lang}
                      snippet={forLang ? forLang.get(feature._id) : null}
                      canEdit={canEdit}
                    />
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      ))}
      {canEdit && outline.length === 0 && (
        <div>
          <AddFirstSectionButton />
        </div>
      )}
    </div>
  );
}
