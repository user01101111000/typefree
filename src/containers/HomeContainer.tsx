import JSONEditor from "@/components/ui/editors/JSONEditor";
import TypeScriptEditor from "@/components/ui/editors/TypeScriptEditor";

const HomeContainer: () => React.JSX.Element = (): React.JSX.Element => {
    return <section className="h-full w-full flex flex-col lg:flex-row">
        <JSONEditor key="json editor" />
        <TypeScriptEditor key="typescript editor" />
    </section>
};

export default HomeContainer;