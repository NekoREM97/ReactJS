import { dictionary } from '../services/dictionary';
export default {
    namespace: 'drawResult',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // console.log(payload)
            const max4d = yield call(dictionary.getMax4dResult);
            yield put({ type: 'save', max4d: max4d });

            const mega = yield call(dictionary.getMegaResult);
            yield put({ type: 'save', mega: mega });

            const power = yield call(dictionary.getPwResult);
            yield put({ type: 'save', power: power });

            const max3d = yield call(dictionary.getMax3DResult);
            yield put({ type: 'save', max3d: max3d });

            const lottery_123 = yield call(dictionary.getLottery123Result);
            yield put({ type: "save", lottery_123: lottery_123 });

            const keno = yield call(dictionary.getKenoResult);
            yield put({ type: 'save', keno: keno });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/draw-result') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}