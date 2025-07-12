package main

import (
	"context"
	"encoding/json"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func RecordToString(record bson.M) string {
	jsonData, err := json.MarshalIndent(record, "", "    ")
	if err != nil {
		panic(err)
	}
	return string(jsonData)
}

func GetRecordByProperty(collName string, prop string, value string) bson.M {
	client, err := mongo.Connect(options.Client().ApplyURI(db_uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	coll := client.Database(db_name).Collection(collName)
	var result bson.M
	err = coll.FindOne(context.TODO(), bson.D{{Key: prop, Value: value}}).
		Decode(&result)
	if err == mongo.ErrNoDocuments {
		fmt.Printf("No document in %s/%s was found with %s: %s\n", db_name, collName, prop, value)
		return bson.M{}
	}
	if err != nil {
		panic(err)
	}

	return result
}

func GetAllRecords(collectionName string) *mongo.Cursor {
	client, err := mongo.Connect(options.Client().ApplyURI(db_uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	collection := client.Database(db_name).Collection(collectionName)
	res, err := collection.Find(context.TODO(), bson.D{})
	if err == mongo.ErrNoDocuments {
		fmt.Printf("No documents were found in %s/%s\n", db_name, collectionName)
		return nil
	}
	if err != nil {
		panic(err)
	}
	return res
}

func AddRecordToCollection(collectionName string, record interface{}) *mongo.InsertOneResult {
	client, err := mongo.Connect(options.Client().ApplyURI(db_uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	collection := client.Database(db_name).Collection(collectionName)

	result, err := collection.InsertOne(context.TODO(), record)
	if err != nil {
		panic(err)
	}

	return result
}
