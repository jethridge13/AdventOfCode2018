import Test from './main'

describe('Basic tests', () => {
	it('Module is able to export basic class function', () => {
		expect(Test.helloWorld()).toEqual('Hello, World!')
	})
})