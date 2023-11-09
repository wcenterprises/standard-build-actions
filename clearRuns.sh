for id in `gh run list --json databaseId  --jq '.[].databaseId'`; do 
  echo "deleting $id" && gh run delete $id && echo "deleted $id"
done 