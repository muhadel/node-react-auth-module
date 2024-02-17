import { ThemeProvider as NextThemeProvider } from "next-themes";
import { MODE_OPTIONS } from "@/utils/config/enums";

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider enableSystem defaultTheme={MODE_OPTIONS.SYSTEM} disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}
