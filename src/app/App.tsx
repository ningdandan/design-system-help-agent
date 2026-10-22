import { useState } from "react";
import { ComponentLab } from "@/app/lab/ComponentLab";
import { DemoExperience } from "@/app/components/DemoExperience";
import { GlobalSiteNav } from "@/app/components/GlobalSiteNav";
import { SkinProvider } from "@/app/SkinContext";
import { TokensProvider } from "@/app/TokensContext";
import { ThemeProvider } from "@/app/ThemeContext";
import { DesignTokensProvider } from "@/app/DesignTokensContext";

function AppInner() {
  const [siteSection, setSiteSection] = useState<"demo" | "components">("demo");

  if (siteSection === "components") {
    return (
      <div className="box-border h-dvh w-full max-w-full overflow-hidden flex flex-col bg-[#c8c8d0]">
        <GlobalSiteNav section="components" onChange={setSiteSection} />
        <div className="flex-1 min-h-0 overflow-hidden bg-[#f7f7f9]">
          <ComponentLab />
        </div>
      </div>
    );
  }

  return (
    <div className="box-border h-dvh w-full max-w-full overflow-hidden flex flex-col bg-[#c8c8d0]">
      <GlobalSiteNav section="demo" onChange={setSiteSection} />
      <DemoExperience variant="page" />
    </div>
  );
}

export default function App() {
  return (
    <DesignTokensProvider>
      <ThemeProvider>
        <TokensProvider>
          <SkinProvider>
            <AppInner />
          </SkinProvider>
        </TokensProvider>
      </ThemeProvider>
    </DesignTokensProvider>
  );
}
