function VehicleConstructor(name, numWheels, numPass, speed)
{
  var self = this;
  var distance_traveled = 0;

  this.name = name;
  this.numWheels = numWheels
  this.numPass = numPass;
  this.speed = speed;

  this.setDistanceTraveled = function(dt)
  {
    distance_traveled = dt;
  }
  this.getDistanceTraveled = function()
  {
    return distance_traveled;
  }
}
VehicleConstructor.prototype.makeNoise = function()
{
  console.log("Noise");
  return this;
}
VehicleConstructor.prototype.move = function()
{
  this.updateDistanceTraveled();
  this.makeNoise();
  return this;
}
VehicleConstructor.prototype.checkMiles = function()
{
  console.log("Distance Traveled: " + this.getDistanceTraveled())
}
VehicleConstructor.prototype.updateDistanceTraveled = function()
{
  var dt = this.getDistanceTraveled();
  dt += this.speed;
  this.setDistanceTraveled(dt);
}

var bike = new VehicleConstructor("Bike", 2, 1, 10);
bike.move().move().checkMiles();
