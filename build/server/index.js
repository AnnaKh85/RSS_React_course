import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Meta, Links, ScrollRestoration, Scripts, Form, Link, useLoaderData } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Outlet } from "react-router-dom";
import { createContext, useState, Component, useContext, useEffect } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import invariant from "tiny-invariant";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery, setupListeners } from "@reduxjs/toolkit/query/react";
import saveAs from "file-saver";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const ThemeContext = createContext(void 0);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme }, children });
};
const meta = () => {
  return [
    { title: "Remix.js. Проба в1.0" }
  ];
};
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] }) })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const initialState = {
  selectedCharacterId: null,
  selectedItems: []
};
const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setSelectedCharacterId(state, action) {
      state.selectedCharacterId = action.payload;
    },
    addSelectedItem(state, action) {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload);
      }
    },
    removeSelectedItem(state, action) {
      state.selectedItems = state.selectedItems.filter((id) => id !== action.payload);
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    }
  }
});
const { setSelectedCharacterId, addSelectedItem, removeSelectedItem, clearSelectedItems } = charactersSlice.actions;
const charactersReducer = charactersSlice.reducer;
const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ name = "", page = 1 }) => ({
        url: `character?name=${name}&page=${page}`
      })
    }),
    getCharacterById: builder.query({
      query: (id) => ({
        url: `character/${id}`
      })
    })
  })
});
const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    characters: charactersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware)
});
setupListeners(store.dispatch);
function Fallback() {
  return /* @__PURE__ */ jsxs("div", { className: "fallback-container", children: [
    /* @__PURE__ */ jsx("p", { children: "Oops, an error occurred..." }),
    /* @__PURE__ */ jsx("p", { children: "Run away from the error!" })
  ] });
}
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(Fallback, {});
    }
    return this.props.children;
  }
}
const ThemeSelector = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "theme-selector", "data-testid": "theme-provider", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "theme", children: "Select Theme: " }),
    /* @__PURE__ */ jsxs("select", { id: "theme", value: theme, onChange: handleThemeChange, children: [
      /* @__PURE__ */ jsx("option", { value: "light", children: "Light" }),
      /* @__PURE__ */ jsx("option", { value: "dark", children: "Dark" })
    ] })
  ] });
};
const SearchComponent = ({ initialSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  useEffect(() => {
  }, []);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    Form,
    {
      id: "main-search",
      role: "search",
      method: "post",
      children: [
        /* @__PURE__ */ jsx("input", { type: "text", value: searchTerm, name: "name", onChange: handleInputChange }),
        /* @__PURE__ */ jsx("button", { onClick: () => false, children: "Search" })
      ]
    }
  ) });
};
function Loader() {
  return /* @__PURE__ */ jsx("div", { className: "loader", "data-testid": "loader-element" });
}
const DetailedView = ({ characterId, onClose }) => {
  const { data: character, error, isLoading } = useGetCharacterByIdQuery(characterId);
  if (isLoading) return /* @__PURE__ */ jsx(Loader, {});
  if (error) return /* @__PURE__ */ jsx("p", { children: "Failed to fetch character details" });
  return /* @__PURE__ */ jsxs("div", { className: "character-details", children: [
    /* @__PURE__ */ jsx("button", { onClick: onClose, children: "Close" }),
    /* @__PURE__ */ jsx("h3", { children: "Character Details" }),
    character && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("img", { src: character.image, alt: character.name }),
      /* @__PURE__ */ jsx("h2", { children: character.name }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Status:" }),
        " ",
        character.status
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Species:" }),
        " ",
        character.species
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Gender:" }),
        " ",
        character.gender
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Location:" }),
        " ",
        character.location.name
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Episodes:" }),
        /* @__PURE__ */ jsx("ul", { children: character.episode.map((ep, index) => /* @__PURE__ */ jsx("li", { children: ep }, index)) })
      ] })
    ] })
  ] });
};
const img404 = "/assets/404-2-C-9cy8-C.jpeg";
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "layout404", "data-testid": "pageNotFound-element", children: [
    /* @__PURE__ */ jsx("img", { className: "pic404", src: img404, alt: "not found" }),
    /* @__PURE__ */ jsx("h2", { children: "404 - PAGE NOT FOUND" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "The page you are looking for might have been removed, ",
      /* @__PURE__ */ jsx("br", {}),
      " had its name changed, or is temporarily unavailable."
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("button", { onClick: () => false, children: "GO TO HOME PAGE" }) })
  ] });
}
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
const ResultsComponent = ({ searchTerm, page, handleChClick, characterId }) => {
  const dispatch = useAppDispatch();
  const selectedCharacterId = useAppSelector((state) => state.characters.selectedCharacterId);
  const selectedItems = useAppSelector((state) => state.characters.selectedItems);
  const { data, error, isLoading } = useGetCharactersQuery({ name: searchTerm, page });
  useEffect(() => {
    if (characterId) {
      dispatch(setSelectedCharacterId(characterId));
    }
  }, [
    /*location.search,*/
    dispatch
  ]);
  const handleCharacterClick = (id) => {
    dispatch(setSelectedCharacterId(id));
    handleChClick(id);
  };
  const handleCloseDetails = () => {
    dispatch(setSelectedCharacterId(null));
  };
  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      dispatch(addSelectedItem(id));
    } else {
      dispatch(removeSelectedItem(id));
    }
  };
  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };
  const handleDownload = () => {
    if (!data) return;
    const selectedCharacters = data.results.filter((character) => selectedItems.includes(character.id));
    const csvContent = selectedCharacters.map(
      (character) => `${character.id},${character.name},${character.status},${character.species},${character.gender},${character.location.name},${character.episode}`
    ).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${selectedItems.length}_characters.csv`);
  };
  const getLinkHref = (page2, searchTerm2) => {
    if (searchTerm2 && searchTerm2 != "") {
      return {
        pathname: `/${page2}`,
        query: { name: searchTerm2 }
      };
    } else {
      return {
        pathname: `/${page2}`
      };
    }
  };
  if (isLoading) return /* @__PURE__ */ jsx(Loader, {});
  if (error) return /* @__PURE__ */ jsx("p", { children: "Failed to fetch characters" });
  if ((data == null ? void 0 : data.results.length) === 0) return /* @__PURE__ */ jsx(NotFoundPage, {});
  return /* @__PURE__ */ jsxs("div", { className: "result-container", "data-testid": "results-component", children: [
    /* @__PURE__ */ jsxs("div", { className: "results-list", onClick: handleCloseDetails, children: [
      /* @__PURE__ */ jsxs("div", { className: "pagination", children: [
        /* @__PURE__ */ jsx(Link, { to: getLinkHref(page - 1, searchTerm), children: /* @__PURE__ */ jsx("button", { onClick: () => false, disabled: page <= 1, children: "Previous" }) }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Page ",
          page
        ] }),
        /* @__PURE__ */ jsx(Link, { to: getLinkHref(page + 1, searchTerm), children: /* @__PURE__ */ jsx("button", { onClick: () => false, disabled: !(data == null ? void 0 : data.info.next), children: "Next" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "card-container", children: data == null ? void 0 : data.results.map((character) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "card",
          "data-testid": "card-element",
          onClick: (e) => {
            e.stopPropagation();
            handleCharacterClick(character.id);
          },
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "selected-character-checkbox",
                type: "checkbox",
                checked: selectedItems.includes(character.id),
                onChange: (e) => handleCheckboxChange(character.id, e.target.checked),
                onClick: (e) => e.stopPropagation()
              }
            ),
            /* @__PURE__ */ jsx("img", { src: character.image, alt: character.name, style: { width: "100%" } }),
            /* @__PURE__ */ jsx("h2", { children: character.name }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Status:" }),
              " ",
              character.status
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Species:" }),
              " ",
              character.species
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Gender:" }),
              " ",
              character.gender
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Location:" }),
              " ",
              character.location.name
            ] })
          ]
        },
        character.id
      )) }),
      selectedItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flyout", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          selectedItems.length,
          " items selected"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleUnselectAll, children: "Unselect All" }),
        /* @__PURE__ */ jsx("button", { onClick: handleDownload, children: "Download" })
      ] })
    ] }),
    selectedCharacterId && /* @__PURE__ */ jsx("div", { className: "details-section", children: /* @__PURE__ */ jsx(DetailedView, { characterId: selectedCharacterId, onClose: handleCloseDetails }) })
  ] });
};
const loader = async ({ params, request }) => {
  invariant(params.pageNum, "Missing contactId param");
  const page = params.pageNum;
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  return { pageNumber: page, name: name ?? void 0 };
};
function Page() {
  const { pageNumber, name } = useLoaderData();
  let page = parseInt(pageNumber);
  if (Number.isNaN(page)) {
    page = 1;
  }
  const [characterId, setCharacterId] = useState(null);
  const { theme } = useContext(ThemeContext);
  console.log("pageNumber=" + pageNumber + ",name=" + name);
  const handleChClick = (characterId2) => {
    setCharacterId(characterId2);
  };
  const throwError = () => {
    throw new Error("Test error");
  };
  return /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: `app-container ${theme}`, "data-testid": "app-component", children: [
    /* @__PURE__ */ jsx(ThemeSelector, {}),
    /* @__PURE__ */ jsxs("div", { className: "search-form", children: [
      /* @__PURE__ */ jsx(SearchComponent, { initialSearchTerm: name ? name : "" }),
      /* @__PURE__ */ jsx("button", { onClick: throwError, children: "Throw Error" })
    ] }),
    /* @__PURE__ */ jsx(ResultsComponent, { searchTerm: name, page, handleChClick, characterId })
  ] }) }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "./assets/entry.client-DQFPOMQY.js", "imports": ["./assets/components-C7w5KGCO.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "./assets/root-Bm58I76l.js", "imports": ["./assets/components-C7w5KGCO.js", "./assets/ThemeContext-BEsUXrFM.js"], "css": [] }, "routes/page.$pageNum": { "id": "routes/page.$pageNum", "parentId": "root", "path": "page/:pageNum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "./assets/page._pageNum-iJ05dVz2.js", "imports": ["./assets/components-C7w5KGCO.js", "./assets/ThemeContext-BEsUXrFM.js"], "css": ["./assets/page-C4OKyjWd.css"] } }, "url": "./assets/manifest-3e7a7ed2.js", "version": "3e7a7ed2" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "./";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/page.$pageNum": {
    id: "routes/page.$pageNum",
    parentId: "root",
    path: "page/:pageNum",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
