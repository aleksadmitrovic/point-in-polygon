"use strict";

const stringIdGenerator = require("./stringIdGenerator.js");
const point = require("./point.js");
const prompt = require("prompt-sync")();

function createPoint(name) {
  const x = prompt("Enter x: ");
  const y = prompt("Enter y: ");

  return new point.Point(name, Number(x), Number(y));
}

function createPolygon() {
  const number = prompt("Enter a number of points: ");
  if (number < 3) {
    console.log("Polygon must have 3 points minimum");
    return;
  } else {
    const polygon = [];

    for (let i = 0; i < number; i++) {
      const name = new stringIdGenerator.StringIdGenerator();
      name._nextId = [i];
      console.log(`create point ${name.next()}`);
      const point = createPoint(name.next());
      polygon.push(point);
    }

    return polygon;
  }
}

function isPointInsidePolygon(point, polygon) {
  const n = polygon.length;
  let count = 0;
  const x = point.x;
  const y = point.y;

  for (let i = 0; i < n - 1; i++) {
    const side = {
      a: {
        x: polygon[i].x,
        y: polygon[i].y,
      },
      b: {
        x: polygon[i + 1].x,
        y: polygon[i + 1].y,
      },
    };
    const x1 = side.a.x;
    const x2 = side.b.x;
    const y1 = side.a.y;
    const y2 = side.b.y;

    if (y < y1 != y < y2 && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) {
      count += 1;
    }
  }

  return count % 2 === 0 ? false : true;
}

const polygon = createPolygon();
if (polygon === undefined) {
  console.log("Try again");
} else {
  const name = prompt("Enter the name of point you want to check: ");
  const pointToCheck = createPoint(name);
  const isPointInside = isPointInsidePolygon(pointToCheck, polygon);

  isPointInside
    ? console.log(`the point ${name} belongs to the polygon`)
    : console.log(`the point ${name} does not belong to the polygon`);
}
