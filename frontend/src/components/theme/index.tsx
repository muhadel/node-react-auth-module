import { ThemeProvider as NextThemeProvider } from "next-themes";
import { MODE_OPTIONS } from "@/utils/config/enums";

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider defaultTheme={MODE_OPTIONS.LIGHT} disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}
