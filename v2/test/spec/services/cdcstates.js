'use strict';

describe('Service: cdcstates', function () {

  // load the service's module
  beforeEach(module('flunearyouV2App'));

  // instantiate service
  var cdcstates;
  beforeEach(inject(function (_cdcstates_) {
    cdcstates = _cdcstates_;
  }));

  it('should do something', function () {
    expect(!!cdcstates).toBe(true);
  });

});
