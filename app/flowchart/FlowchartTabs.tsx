"use client";

import { useCallback, useEffect, useState } from "react";

import { Flowchart } from "@/components/Flowchart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SECTION_TABS, TabId } from "@/lib/sections";

const DEFAULT_TAB_ID: TabId = SECTION_TABS[0].id;

function findAnchorForTab(tabId: TabId) {
  return SECTION_TABS.find((tab) => tab.id === tabId)?.anchor ?? tabId;
}

function findIdForAnchor(anchor: string) {
  return SECTION_TABS.find((tab) => tab.anchor === anchor)?.id ?? null;
}

function useAnchorScroll() {
  return useCallback((anchor: string) => {
    requestAnimationFrame(() => {
      const element = document.getElementById(anchor);
      if (!element) {
        return;
      }
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined") {
        const url = `${window.location.pathname}#${anchor}`;
        window.history.replaceState(null, "", url);
      }
    });
  }, []);
}

export function FlowchartTabsSection() {
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB_ID);
  const scrollToAnchor = useAnchorScroll();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }
    const matchedId = findIdForAnchor(hash);
    if (!matchedId) {
      return;
    }
    setActiveTab(matchedId);
    scrollToAnchor(hash);
  }, [scrollToAnchor]);

  const handleTabChange = useCallback(
    (value: string) => {
      const nextTab = value as TabId;
      setActiveTab(nextTab);
      scrollToAnchor(findAnchorForTab(nextTab));
    },
    [scrollToAnchor]
  );

  const handleSectionNavigate = useCallback(
    (sectionId: TabId) => {
      setActiveTab(sectionId);
      scrollToAnchor(findAnchorForTab(sectionId));
    },
    [scrollToAnchor]
  );

  return (
    <>
      <div className="h-full min-h-[600px] rounded-xl border border-border bg-background shadow-sm">
        <Flowchart onSectionNavigate={handleSectionNavigate} />
      </div>
      <div className="mt-12">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col gap-6">
          <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
            {SECTION_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="border border-transparent data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {SECTION_TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <section
                id={tab.anchor}
                className="space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm"
              >
                <header className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">{tab.label}</h2>
                  <p className="text-sm text-muted-foreground">{tab.blurb}</p>
                </header>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Use this space to expand on <strong className="text-foreground">{tab.label.toLowerCase()}</strong>{" "}
                    guidance. Future updates will add deep dives, checklists, and contextual tools to move from the
                    high-level roadmap into day-to-day actions.
                  </p>
                  <p>
                    For now, capture the questions you want answered, resources you rely on, and decisions you still need
                    to make. When detailed MDX content arrives, the section will walk through practical steps tailored to
                    each milestone on the flowchart.
                  </p>
                </div>
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
