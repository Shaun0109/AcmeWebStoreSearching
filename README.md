# AcmeWebStoreSearching

## Introduction
Acme Ltd operates a web store for their customers. The product area of the site is
structured in a traditional manner using a tree of categories. Each category level
displays zero or more items and links to zero or more subcategories. The same item
can sometimes appear in multiple categories.
Customers must log in to the site to access the product area. One logged in Acme
manages the visibility of each category by customer. Some categories (and thus the
categories’ items) can be seen by all customers whilst others can be seen by only a
specific customer or customers.

To speed up item searches on the site the development team has decided to
pre-compute which items are visible to which customers. Then, when a search is
performed, the found list of items can be quickly filtered using this pre-prepared data
to ensure that only items that are visible to the customer are displayed.

## Tasks

## Task 1:
The category, item and customer visibility data will be held
in-memory in a Javascript object structure. Design a structure
to hold this data.

## Task 2:
Write a Javascript function which takes the root object of the
category tree as a parameter and returns an array containing a
list of objects, one object per customer. Each object will contain
a list of the items that are visible to that customer across the
entire site.
