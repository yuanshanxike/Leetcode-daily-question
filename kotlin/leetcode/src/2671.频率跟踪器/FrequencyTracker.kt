package source.`2671`.频率跟踪器

class FrequencyTracker() {

    // <number, occurs frequency>
    private val numberMap = mutableMapOf<Int, Int>()

    // <occurs frequency, kinds of number>
    private val frequencyMap = mutableMapOf<Int, Int>()

    fun add(number: Int) {
        numberMap[number]?.also {
            numberMap[number] = it + 1
            optFrequencyMap(it)
        } ?: apply {
            numberMap[number] = 1
            optFrequencyMap(0)
        }
    }

    fun deleteOne(number: Int) {
        numberMap[number]?.also {
            if (it > 0) {
                numberMap[number] = it - 1
                optFrequencyMap(it, false)
            }
        }
    }

    fun hasFrequency(frequency: Int): Boolean = frequencyMap[frequency]?.let { it > 0 } ?: false

    private fun optFrequencyMap(curFrequency: Int, isAdd: Boolean = true) {
        // last frequency decrease by 1
        if (curFrequency > 0) {
            frequencyMap[curFrequency]?.also { typeN ->
                frequencyMap[curFrequency] = typeN - 1
            }
        }
        val nextFrequency = if (isAdd) curFrequency + 1 else curFrequency - 1
        // new frequency add 1
        if (nextFrequency > 0) {
            frequencyMap[nextFrequency]?.also { typeN ->
                frequencyMap[nextFrequency] = typeN + 1
            } ?: apply {
                frequencyMap[nextFrequency] = 1
            }
        }
    }

}