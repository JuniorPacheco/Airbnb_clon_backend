const chai = require("chai");
const { it, describe } = require("mocha");
const chaiHttp = require("chai-http");

const app = require("../../app");

chai.use(chaiHttp);

//* Comando mocha => ./node_modules/.bin/mocha .\src\reservations\test\integration.test.js

describe("Suite de test de reservations", () => {
  const JWT_HOST_ROLE =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5MTFlMTUzLTJkNGEtNDMzOC1hNGQ2LWExN2ZkMzhmZWE5OSIsImVtYWlsIjoianVuaW9yQGFjYWRlbWxvLmNvbSIsInJvbGVJZCI6Ijk3MDA2ZmUwLTRhMzUtNDdmNC1iZmJmLWZjOTYyZTVmZTUwMCIsImlhdCI6MTY2MzAxNTQxMX0.aCszGFKYOPZ6d9sbyzf2QyV-HJ-fn-MW4j-ZtJSp1mE";

  const JWT_ADMIN_ROLE =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0Y2Q2MDExLTdlNzYtNGQ2ZC1iMjViLTFkNmU0MTgyZWMyZiIsImVtYWlsIjoic2FoaWRAYWNhZGVtbG8uY29tIiwicm9sZUlkIjoiNWVlNTUxZWQtN2JmNC00NGIwLWFlYjUtZGFhYTgyNGI5NDczIiwiaWF0IjoxNjYzMDE1NDg2fQ.JA01YchDYDczOO2EBC-zpskFcUN0067OWePEb3co-4s";

  const JWT_GUEST_ROLE =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwOTNhYjg0LTZhZTYtNGUyMC04MDljLWVjZGVjOGUwNjI2NyIsImVtYWlsIjoiZmFiaWFuQGFjYWRlbWxvLmNvbSIsInJvbGVJZCI6ImZlZjNhMDhkLTJjZWMtNDcyOC05NzQ1LTdjYmQyYjM3ZTU1NyIsImlhdCI6MTY2MzAxNTMwOH0.L6GATNEkfLKcqFsGuX1vLn8S2qPONrlKt5wd7ZJJFMo";

  it("Should return 204 when i delete my own reservation with my credentials and host role", (done) => {
    chai
      .request(app)
      .delete("/api/v1/reservations/7383c6f8-7bc2-4058-b099-c3aff3d6f6e4")
      .set("Authorization", `JWT ${JWT_HOST_ROLE}`)
      .end((err, res) => {
        chai.assert.equal(res.status, 204);
        done();
      });
  });

  it("Should return 204 when i delete my own reservation with my credentials and guest role", (done) => {
    chai
      .request(app)
      .delete("/api/v1/reservations/59651d5f-b174-4d80-a6e5-fe22458ff112")
      .set("Authorization", `JWT ${JWT_GUEST_ROLE}`)
      .end((err, res) => {
        chai.assert.equal(res.status, 204);
        done();
      });
  });

  it("Should return 201 when created a reservation with guest role", (done) => {
    chai
      .request(app)
      .post("/api/v1/reservations")
      .set("Authorization", `JWT ${JWT_GUEST_ROLE}`)
      .send({
        arrival: "2022-09-12 09:08:13.756 -0500",
        departure: "2022-10-12 09:08:13.756 -0500",
        accommodationId: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
        adults: 2,
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 201);
        console.log(err, "soy el error")
        done();
      });
  });
});
