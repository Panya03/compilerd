package main

import (
  "fmt"
  "testing"
)

func TestHelloWorld(t *testing.T) {
  expected := "Hello, World!"
  actual := fmt.Println("Hello, World!")
  if actual != expected {
    t.Errorf("Expected %s, got %s", expected, actual)
  }
}
