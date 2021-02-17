import smartpy as sp

class StoreValue(sp.Contract):
    def __init__(self, value):
        self.init(storedValue = value)

    @sp.entry_point
    def replace(self, params):
        self.data.storedValue = params.value

    @sp.entry_point
    def double(self, params):
        self.data.storedValue *= 2

    @sp.entry_point
    def divide(self, params):
        sp.verify(params.divNb > 5)
        self.data.storedValue /= params.divNb


@sp.add_test(name = "StoreValue")
def test():
    c1 = StoreValue(12)
    scenario = sp.test_scenario()
    scenario.h1("Store Value")
    scenario += c1
    scenario += c1.replace(value = 15)
    scenario.p("Some computation").show(c1.data.storedValue * 12)
    scenario += c1.replace(value = 25)
    scenario += c1.double()
    scenario += c1.divide(divNb = 2).run(valid = False)
    scenario.verify(c1.data.storedValue == 50)
    scenario += c1.divide(divNb = 6)
    scenario.verify(c1.data.storedValue == 8)