import React from 'react';
import { 
    StyleSheet,
    Text,
    View
} from 'react-native';

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    displayValue: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        fontSize: 60,
        color: '#fff',
    }
});

export default props => {
    return (
        <View style={styles.display}>
            <Text style={styles.displayValue} 
                numberOfLines={1}>{props.value}
            </Text>
        </View>
    );
}
