import {useState, useContext} from "react";
import {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import ThemeSelector from "../lib/themeSelector/ThemeSelector";
import {Provider} from "react-redux";
import ErrorBoundary from "../lib/errBoundary/ErrorBoundary";
import SearchComponent from "../lib/search/SearchComponent";
import ResultsComponent from "../lib/result/ResultsComponent";
import {store} from "../store";
import {ThemeContext} from "../lib/context/ThemeContext";


export const loader = async ({params, request}: LoaderFunctionArgs) => {
    //invariant(params.pageNum, "Missing contactId param");
    const page = params.pageNum ?? "1";


    const url = new URL(request.url);
    const name  = url.searchParams.get("name");

    // const contact = await getContact(params.contactId);
    // if (!contact) {
    //     throw new Response("Not Found", { status: 404 });
    // }
    return { pageNumber: page, name: (name ?? undefined) };
};


export default function Page() {
    const { pageNumber, name } = useLoaderData<typeof loader>();
    // const { pageNumber, name } = {pageNumber: "1", name: "2"};

    // const pageNumber = pageNumber;
    let page = parseInt(pageNumber);
    // let page = 1
    //const name = props.searchParams?.name;

    if (Number.isNaN(page)) {
        page = 1;
    }

    const [characterId, setCharacterId] = useState<number | null>(null);
    const { theme } = useContext(ThemeContext)!;

    console.log('pageNumber=' + pageNumber + ',name=' + name);

    // const handleSearch = (term: string) => {
    //     setSearchTerm(term);
    // };

    const handleChClick = (characterId: number) => {
        setCharacterId(characterId);
    };

    const throwError = () => {
        throw new Error('Test error');
    };

    return (
        <Provider store={store}>
             <ErrorBoundary>
                 <div className={`app-container ${theme}`} data-testid="app-component">
                     <ThemeSelector />
                     <div className="search-form">
                         <SearchComponent initialSearchTerm={name ? name : ''} />
                         <button onClick={throwError}>Throw Error</button>
                     </div>
                     <ResultsComponent searchTerm={name} page={page} handleChClick={handleChClick} characterId={characterId} />
                 </div>
             </ErrorBoundary>
        </Provider>
    );
};
