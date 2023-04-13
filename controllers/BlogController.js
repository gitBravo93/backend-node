import { pool } from "../database/db.js";

//** Métodos para el CRUD **/

//Mostrar todos los registros

export const getAllBlogs = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM blogs");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

//Mostrar un registro

export const getBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "blogs not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

//Crear un registro

export const createBlog = async (req, res) => {
    try {
      const { title, categoria, content } = req.body;
      const [rows] = await pool.query(
        "INSERT INTO blogs (title, categoria, content) VALUES (?, ?, ?)",
        [title, categoria, content]
      );
      res.status(201).json({ id: rows.insertId, title, categoria, content });
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

//Actualizar un registro

export const updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, categoria, content } = req.body;
  
      const [result] = await pool.query(
        "UPDATE blogs SET title = IFNULL(?, title), categoria = IFNULL(?, categoria), content = IFNULL(?, content) WHERE id = ?",
        [title, categoria, content, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "blogs not found" });
  
      const [rows] = await pool.query("SELECT * FROM database_app WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

//Eliminar un registro

export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "blogs not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
