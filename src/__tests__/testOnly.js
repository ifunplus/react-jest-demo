test.only('this will be the only test that runs', () => {
    console.log('testOnly')
    expect(true).toBe(true);
});

test('this test will not run', () => {
    console.log('other info')
    expect('A').toBe('A');
});