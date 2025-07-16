let emergencyRequests = [];

exports.storeRequest = (reqObj) => {
  emergencyRequests.push(reqObj);
};

exports.getRequestById = (id) => {
  return emergencyRequests.find((r) => r.id === id);
};

exports.updateDoctor = (requestId, doctorId) => {
  const req = emergencyRequests.find((r) => r.id === requestId);
  if (req) {
    req.assignedDoctor = doctorId;
    req.status = "assigned";
    return req;
  }
  return null;
};
