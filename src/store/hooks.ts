import {AppDispatch, RootState, AppStore} from "./store";
import {useStore, useDispatch, useSelector} from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

