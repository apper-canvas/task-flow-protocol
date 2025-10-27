import { getApperClient } from "@/services/apperClient";

const TABLE_NAME = "task_c";

// Field mapping for API operations
const UPDATEABLE_FIELDS = [
  "title_c",
  "completed_c",
  "priority_c",
  "due_date_c",
  "category_c",
  "notes_c",
  "completed_at_c"
];

const ALL_FIELDS = [
  { field: { Name: "Id" } },
  { field: { Name: "Name" } },
  { field: { Name: "title_c" } },
  { field: { Name: "completed_c" } },
  { field: { Name: "priority_c" } },
  { field: { Name: "due_date_c" } },
  { field: { Name: "category_c" } },
  { field: { Name: "notes_c" } },
  { field: { Name: "completed_at_c" } },
  { field: { Name: "CreatedOn" } },
  { field: { Name: "ModifiedOn" } }
];

export const taskService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: ALL_FIELDS,
        orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: ALL_FIELDS
      };

      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(taskData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Only include updateable fields
      const recordData = {};
      if (taskData.title_c !== undefined) recordData.title_c = taskData.title_c;
      if (taskData.completed_c !== undefined) recordData.completed_c = taskData.completed_c;
      if (taskData.priority_c !== undefined && taskData.priority_c !== null) recordData.priority_c = taskData.priority_c;
      if (taskData.due_date_c !== undefined && taskData.due_date_c !== null) recordData.due_date_c = taskData.due_date_c;
      if (taskData.category_c !== undefined && taskData.category_c !== null) recordData.category_c = taskData.category_c;
      if (taskData.notes_c !== undefined && taskData.notes_c !== null && taskData.notes_c !== "") recordData.notes_c = taskData.notes_c;
      if (taskData.completed_at_c !== undefined && taskData.completed_at_c !== null) recordData.completed_at_c = taskData.completed_at_c;

      const params = {
        records: [recordData]
      };

      const response = await apperClient.createRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                throw new Error(`${error.fieldLabel}: ${error.message || error}`);
              });
            }
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }

        return successful[0]?.data;
      }

      return null;
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Only include updateable fields
      const recordData = { Id: parseInt(id) };
      if (updates.title_c !== undefined) recordData.title_c = updates.title_c;
      if (updates.completed_c !== undefined) recordData.completed_c = updates.completed_c;
      if (updates.priority_c !== undefined) recordData.priority_c = updates.priority_c;
      if (updates.due_date_c !== undefined) recordData.due_date_c = updates.due_date_c;
      if (updates.category_c !== undefined) recordData.category_c = updates.category_c;
      if (updates.notes_c !== undefined) recordData.notes_c = updates.notes_c;
      if (updates.completed_at_c !== undefined) recordData.completed_at_c = updates.completed_at_c;

      const params = {
        records: [recordData]
      };

      const response = await apperClient.updateRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                throw new Error(`${error.fieldLabel}: ${error.message || error}`);
              });
            }
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }

        return successful[0]?.data;
      }

      return null;
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async bulkUpdate(ids, updates) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const records = ids.map(id => {
        const recordData = { Id: parseInt(id) };
        if (updates.completed_c !== undefined) recordData.completed_c = updates.completed_c;
        if (updates.completed_at_c !== undefined) recordData.completed_at_c = updates.completed_at_c;
        return recordData;
      });

      const params = { records };

      const response = await apperClient.updateRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        return successful.map(r => r.data);
      }

      return [];
    } catch (error) {
      console.error("Error bulk updating tasks:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async bulkDelete(ids) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        RecordIds: ids.map(id => parseInt(id))
      };

      const response = await apperClient.deleteRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        return successful.length === ids.length;
      }

      return false;
    } catch (error) {
      console.error("Error bulk deleting tasks:", error?.response?.data?.message || error);
      throw error;
    }
  }
};