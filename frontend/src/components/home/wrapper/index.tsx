import cn from "@/utils/class-names";
import { Title } from "@/components/ui/text";

export default function HomeWrapper({ title, className = "" }: { children: React.ReactNode; title: React.ReactNode; className?: string }) {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <div className="flex w-full flex-col justify-center px-5">
        <div className={cn("mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2", className)}>
          <div className="flex flex-col items-center">
            <Title as="h2" className="mb-7 text-center text-[28px] font-bold md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl">
              {title}
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
}
