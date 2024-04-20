import { useNavigation } from '@react-navigation/native'

const useIsFocused = () => {
    const navigation = useNavigation()
    return navigation.isFocused()
}

export default useIsFocused