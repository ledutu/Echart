import Fonts from './Fonts';
import Colors from './Colors';

const ApplicationStyles = {
    appContainer: {
        flex: 1,
        backgroundColor: Colors.bgBody
    },
    bold: {
        fontWeight: 'bold'
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: 10
    },
    mt15: {
        marginTop: 15
    },
    mt20: {
        marginTop: 20,
    },
    ml5: {
        marginLeft: 5
    },
    mr10: {
        marginRight: 10,
    },
    pv5: {
        paddingVertical: 5,
    },
    ph20: {
        paddingHorizontal: 20,
    },
    mb10: {
        marginBottom: 10,
    },
    mh20: {
        marginHorizontal: 20,
    },
    pv10: {
        paddingVertical: 10,
    },
    mlAuto: {
        marginLeft: 'auto'
    },
    mrAuto: {
        marginRight: 'auto'
    },
    flexCenterMid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRowBetweenMid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexRowMid: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRowCenterMid: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRowAroundMid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    flexGridBetween: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    flexGridBetweenMid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    border: {
        borderWidth: 1,
        borderColor: Colors.grey400
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: Colors.grey400
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey400
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderLeftColor: Colors.grey400
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: Colors.grey400
    },
    blueText: {
        color: Colors.main,
        textDecorationLine: 'none',
    },
    orangeText: {
        color: Colors.secondary,
        textDecorationLine: 'none',
    }

};

export default ApplicationStyles;
