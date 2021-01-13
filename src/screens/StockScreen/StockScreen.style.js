import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    statusBar: {
        height: 10,
    },
    stocksBlock: {
        flexDirection: "column",
        marginBottom: 10,
        flex: 9,
    },
    detailedBlock: {
        flex: 5,
        backgroundColor: "#202020",
        justifyContent: "space-between",
    },
    footerBlock: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#202020",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    loadingText: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 40,
        marginBottom: 10,
        marginRight: 10,
        color: "white",
    },
    finance: {
        flex: 1,
    },
    financeText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
    },
    footerMiddle: {
        flex: 1,
    },
    marketTimeText: {
        fontSize: 12,
        color: "#A6A6A6",
        textAlign: "center",
    },
    settings: {
        flex: 1,
        alignItems: "flex-end",
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default styles;