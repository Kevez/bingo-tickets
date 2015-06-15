describe("Tickets", function() {

	beforeEach(function () {
		Tickets = new app.Tickets();
	});

	it("should return an array of ticket objects", function() {
		expect(Tickets.tickets).toEqual(jasmine.any(Array));
	});

	it("should return six ticket objects", function() {
		expect(Tickets.tickets.length).toEqual(6);
	});
});