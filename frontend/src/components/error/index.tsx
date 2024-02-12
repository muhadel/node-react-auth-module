import { Component, ErrorInfo, ReactNode } from "react";
import { Text, Title } from "@/components/ui/text";
import MaintenanceImg from "@/assets/maintenance.png";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });
    // Log the error or perform additional actions if needed
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex grow items-center px-6 xl:px-10 mt-60">
          <div className="mx-auto flex w-full max-w-[1520px] flex-col-reverse items-center justify-between gap-5 text-center lg:flex-row lg:text-start">
            <div>
              <Title
                as="h1"
                className="mb-3 text-[22px] font-bold leading-snug text-gray-1000 sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
              >
                Oops! Something went wrong.
              </Title>
              <Text className="mb-6 text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
                We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
              </Text>
            </div>
            <div className="pt-5 lg:pt-0">
              <img src={MaintenanceImg} alt="maintenance" className="aspect-[768/558] max-w-[320px] dark:invert sm:max-w-sm xl:max-w-[580px] 2xl:max-w-[768px]" />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
