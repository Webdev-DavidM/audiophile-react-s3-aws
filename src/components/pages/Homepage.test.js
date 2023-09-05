/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router, BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("landing on a bad page", async () => {});
